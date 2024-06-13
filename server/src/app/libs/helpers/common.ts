import { plainToClass, ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { resolve } from 'node:path';
import { OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'yaml';
import * as fs from 'node:fs';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

type PlainObject<T> = Partial<Record<keyof T, unknown>>;

export function fillDTO<T, O>(
  DtoClass: ClassConstructor<T>,
  plainObject: O,
  options?: ClassTransformOptions,
): T;

export function fillDTO<T, O extends []>(
  DtoClass: ClassConstructor<T>,
  plainObject: O,
  options?: ClassTransformOptions,
): T[];

export function fillDTO<T, O extends PlainObject<T> | PlainObject<T>[]> (
  DTOClass: ClassConstructor<T>,
  plainObject: O,
  options: ClassTransformOptions = { excludeExtraneousValues: true }
): T | T[] {
  return plainToClass(DTOClass, plainObject, options);
}

export function omitUndefined(value: Record<string, unknown>) {
  const entries = Object.entries(value);
  const filteredEntries = entries.filter(([, value]) => value !== undefined);

  return Object.fromEntries(filteredEntries);
}

// Exclude keys from object
export function excludeKeys<T, Key extends keyof T>(
  object: T,
  keys: Key[]
): Omit<T, Key> {
  const excludedKeysObject = Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key))
  );
  return excludedKeysObject as Omit<T, Key>;
}

export function getDate(): string {
  return new Date().toISOString();
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Incorrect time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function generateSpecYaml(
  swaggerDocument: OpenAPIObject,
  filename: string = 'specification.yml',
  path: string = '../specification'
) {
  const specYamlDir = resolve(path);
  const specYamlString = yaml.stringify(swaggerDocument, {});

  if(!fs.existsSync(specYamlDir)) {
    fs.mkdirSync(specYamlDir);
  }
  fs.writeFileSync(`${specYamlDir}/${filename}`, specYamlString);
}

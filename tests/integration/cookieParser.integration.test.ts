import * as path from 'path';
import shell from 'shelljs';
import { describe, expect, test } from '@jest/globals';

describe('Cookie Parser integration tests', () => {
    const inputFilePath = path.resolve(__dirname, '../../test_files/original1.csv');
    const scriptPath = path.resolve(__dirname, '../../dist/index.js');
    test('It should correctly identify the most active cookie for a given date', () => {
        const command = `node ${scriptPath} -f ${inputFilePath} -d 2018-12-09`;
        const result = shell.exec(command, { silent: true }).stdout;
        expect(result.trim()).toEqual('AtY0laUfhglK3lC7');
    });

    test('It should correct count two most active cookies', () => {
        const inputFilePathTwoMostActive = path.resolve(__dirname, '../../test_files/two_most_active.csv');
        const command = `node ${scriptPath} -f ${inputFilePathTwoMostActive} -d 2018-12-09`;
        const result = shell.exec(command, { silent: true }).stdout;
        expect(result.trim()).toContain('AtY0laUfhglK3lC7');
        expect(result.trim()).toContain('5UAVanZf6UtGyKVS');
        expect(result.trim().split('\n').length).toBe(2);
    });

    test('It should correct count cross-timezone most active cookie', () => {
        const inputFilePathCrossTimeZone = path.resolve(__dirname, '../../test_files/cross_time_zone.csv');

        const command = `node ${scriptPath} -f ${inputFilePathCrossTimeZone} -d 2018-12-09`;
        const result = shell.exec(command, { silent: true }).stdout;
        expect(result.trim().split('\n').length).toBe(2);

        expect(result.trim()).toContain('AtY0laUfhglK3lC7');
        expect(result.trim()).toContain('4sMM2LxV07bPJzwf');
    });

    test('It should work correctly on 4x2 dataset', () => {
        const dataSetFileName = path.resolve(__dirname, '../../test_files/4_for_2_on_single_date.csv');
        const command = `node ${scriptPath} -f ${dataSetFileName} -d 2024-04-19`;

        const result = shell.exec(command, { silent: true }).stdout;

        expect(result.trim()).toContain('cookie_1');
        expect(result.trim()).toContain('cookie_2');
        expect(result.trim().split('\n').length).toBe(2);
    });

    test('It should work correctly on 10x2 dataset', () => {
        const dataSetFileName = path.resolve(__dirname, '../../test_files/10_for_2_on_single_date.csv');
        const command = `node ${scriptPath} -f ${dataSetFileName} -d 2024-04-19`;

        const result = shell.exec(command, { silent: true }).stdout;

        expect(result.trim().split('\n').length).toBe(1);
        expect(result.trim()).toContain('cookie_2');
    });

    test('It should work correctly on 100x2 dataset', () => {
        const dataSetFileName = path.resolve(__dirname, '../../test_files/100_for_2_on_single_date.csv');
        const command = `node ${scriptPath} -f ${dataSetFileName} -d 2024-04-19`;

        const result = shell.exec(command, { silent: true }).stdout;

        expect(result.trim().split('\n').length).toBe(1);
        expect(result.trim()).toContain('cookie_2');
    });

    test('It should work correctly on large dataset with not found date', () => {
        const largeDataSetFileName = path.resolve(__dirname, '../../test_files/100000_for_100_x10_dates.csv');
        const command = `node ${scriptPath} -f ${largeDataSetFileName} -d 2004-04-19`;

        const result = shell.exec(command, { silent: true }).stdout;

        expect(result.trim()).toEqual('');
        expect(result.trim().split('\n').length).toBe(1);
    });

    test('It should work correctly on large dataset', () => {
        const largeDataSetFileName = path.resolve(__dirname, '../../test_files/100000_for_100_x10_dates.csv');
        const command = `node ${scriptPath} -f ${largeDataSetFileName} -d 2024-04-19`;

        const result = shell.exec(command, { silent: true }).stdout;

        expect(result.trim()).toEqual('cookie_6');
        expect(result.trim().split('\n').length).toBe(1);
    })

    test('It should handle non-existent files with a error message', () => {
        const command = `node ${scriptPath} -f incorrect_path.csv -d 2018-12-09`;
        const result = shell.exec(command, { silent: true });
        expect(result.code).not.toBe(0);
        expect(result.stderr).toContain('no such file or directory');
    });

    test('It should notify about incorrect date format', () => {
        const command = `node ${scriptPath} -f ${inputFilePath} -d bad_date`;
        const result = shell.exec(command, { silent: true });
        expect(result.code).not.toBe(0);
        expect(result.stderr).toContain('Invalid date');
    });
});
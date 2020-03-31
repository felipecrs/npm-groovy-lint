#! /usr/bin/env node
"use strict";
const NpmGroovyLint = require('../src/groovy-lint.js');
let assert = require("assert");
const path = require("path");

describe('Miscellaneous', function () {

    it('(API:source) returns config file path using config', async () => {
        const npmGroovyLintConfig = {
            path: "./lib/example/",
            files: '**/SampleFile.groovy',
            output: 'txt',
            verbose: true
        };
        const linter = await new NpmGroovyLint(
            npmGroovyLintConfig, {
            jdeployRootPath: 'jdeploy-bundle'
        }).run();
        const filePath = await linter.getConfigFilePath();
        assert(linter.status === 0, 'Linter status is 0');
        assert(path.resolve(filePath) === path.resolve('./lib/example/.groovylintrc.json'), ".groovylintrc.json has been returned")
    });

    it('(API:source) returns config file path using parameter', async () => {
        const npmGroovyLintConfig = {
        };
        const linter = new NpmGroovyLint(
            npmGroovyLintConfig, {
            jdeployRootPath: 'jdeploy-bundle'
        });
        const filePath = await linter.getConfigFilePath('./lib/example');
        assert(linter.status === 0, 'Linter status is 0');
        assert(path.resolve(filePath) === path.resolve('./lib/example/.groovylintrc.json'), ".groovylintrc.json has been returned")
    });


    it('(API:source) return rules', async () => {
        const npmGroovyLintConfig = {
            path: "./lib/example/",
            files: '**/Jenkinsfile',
            returnrules: true,
            output: 'none'
        };
        const linter = await new NpmGroovyLint(
            npmGroovyLintConfig, {
            jdeployRootPath: 'jdeploy-bundle'
        }).run();
        assert(linter.status === 0, 'Linter status is 0');
        assert(linter.lintResult.rules != null, "Rules are returned ");
        assert(linter.lintResult.rules['AssertWithinFinallyBlock'].docUrl != null, "Rules doc urls are returned ");
    });

    it('(API:source) do not return rules', async () => {
        const npmGroovyLintConfig = {
            path: "./lib/example/",
            files: '**/Jenkinsfile',
            output: 'none'
        };
        const linter = await new NpmGroovyLint(
            npmGroovyLintConfig, {
            jdeployRootPath: 'jdeploy-bundle'
        }).run();
        assert(linter.status === 0, 'Linter status is 0');
        assert(linter.lintResult.rules == null, "Rules are not returned");
    });

});
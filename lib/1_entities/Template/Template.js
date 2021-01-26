"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (deps) => {
    return function makeTemplate(props) {
        const dto = { ...props };
        return Object.freeze({
            getPath: () => {
                return dto.path;
            },
            getRequiredVariables: () => {
                return dto.config.variables;
            },
            getFiles: () => {
                return dto.files;
            },
            getInterpolatedFiles(vars) {
                return dto.files.map((file) => {
                    file = interpolateFile(file, vars);
                    file.path = formatPath(file.path);
                    return file;
                });
            },
            setPath(newPath) {
                dto.path = newPath;
                return this;
            },
            toDTO: () => dto,
        });
        function interpolateFile(f, v) {
            return Object.keys(v).reduce((file, variable) => {
                const path = interpolate(file.path, variable, v[variable]);
                const contents = interpolate(file.contents, variable, v[variable]);
                return { path, contents };
            }, f);
        }
        function interpolate(target, variable, value) {
            return target.replace(new RegExp(formatVariable(variable), "g"), value);
        }
        function formatPath(path) {
            return dto.path ? deps.joinPaths(dto.path, path) : path;
        }
        function formatVariable(variable) {
            return dto.config.variablePrefix + variable + dto.config.variableSuffix;
        }
    };
};

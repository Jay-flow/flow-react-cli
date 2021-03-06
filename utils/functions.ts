"use strict"

import shelljs = require("shelljs")
import path = require("path")

export interface TemplateType {
  file: string
  testFile: string
}

export const resolveTemplate = (
  projectType: string,
  componentType: string,
  componentName: string,
  fileExt = "tsx"
): TemplateType => {
  const template = path.resolve(
    __dirname,
    "..",
    `templates/${projectType}/${componentType}s/${componentName}.${fileExt}`
  )

  const testTemplate = path.resolve(
    __dirname,
    "..",
    `templates/${projectType}/${componentType}s/${componentName}.test.${fileExt}`
  )

  return {
    file: template,
    testFile: testTemplate
  }
}

export const resolveComponent = (
  componentType: string,
  name: string,
  fileExt = "tsx"
): TemplateType => {
  const component = `./src/components/${componentType}s/${name}.${fileExt}`
  const testComponent = `./src/components/${componentType}s/__tests__/${name}.test.${fileExt}`

  return {
    file: component,
    testFile: testComponent
  }
}

export const toCamelCase = (str: string, cap1st: boolean): string => {
  return ((cap1st ? "-" : "") + str).replace(/-+([^-])/g, (a, b) => {
    return b.toUpperCase()
  })
}

export const isCamelCase = (str: string): boolean => {
  if (toCamelCase(str, true) === str) return true
  else return false
}

export const AppNameToNodePackageName = (str: string): string => {
  return str
    .replace(/([a-zA-Z])(?=[A-Z])/g, "$1-")
    .replace("_", "-")
    .toLowerCase()
}

export const camelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    // or if (/\s+/.test(match)) for white spaces

    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export const upperCamelize = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
    if (+match === 0) return ""
    // or if (/\s+/.test(match)) for white spaces

    return match.toUpperCase()
  })
}

export const exec = (command: string): Promise<string> => {
  return new Promise((resolve, reject): unknown =>
    shelljs.exec(command, {}, (code: number, value: string, error: string) => {
      if (error) {
        reject(error)

        return
      }

      resolve(value)
    })
  )
}

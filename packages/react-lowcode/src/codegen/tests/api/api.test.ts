import fs from 'fs'
import path from 'path'
import { addColumn, addFormInput, deleteColumn, getColumnSourcePosition, getFormWidgetProperties, isSelectedDataTable, isSelectedFormWidget, setFormWidgetProperties } from '../..';
import { SourceLineCol } from '../../../ast';
import { CodegenRw } from '../../io/codegenRw';
import { graphqlGenTs1 } from '../typeAlias.example';

describe(".api tests", () => {
    test(".is data table widget", () => {
        const file = fs.readFileSync(path.resolve('src/codegen/tests/list/files/is-datatable-test-file.txt'),'utf-8') 
  
        const source : SourceLineCol = {lineNumber: 12, columnNumber:17, fileName:'test'}
        const isSelected = isSelectedDataTable(file, source)
        expect(isSelected).toBe(true)
    }); 

    test(".is form widget", () => {
        const file = fs.readFileSync(path.resolve('src/codegen/tests/detail/detail-test-file.txt'),'utf-8') 
  
        const source : SourceLineCol = {lineNumber: 69, columnNumber:17, fileName:'test'}
        const isSelected = isSelectedFormWidget(file, source)
        expect(isSelected).toBe(true)
    }); 

    test(".add column", () => {
        const filePath = 'src/codegen/tests/list/files/is-datatable-test-file.txt'
        const source : SourceLineCol = {lineNumber: 12, columnNumber:17, fileName:filePath}

        addColumn(graphqlGenTs1, new CodegenRw(), source, {property: 'testdate'}).then(generated => console.log(generated))
    });

    test(".add form input", () => {
        const filePath = 'src/codegen/tests/detail/detail-test-file.txt'
        const source : SourceLineCol = {lineNumber: 69, columnNumber:17, fileName:filePath}

        addFormInput(graphqlGenTs1, new CodegenRw(), source, {property: 'test2'}).then(generated => console.log(generated))
    });

    test(".delete column", () => {
        const filePath = 'src/codegen/tests/list/list-test-file.txt'
        const source: SourceLineCol = { lineNumber: 10, columnNumber: 61, fileName: filePath }

        deleteColumn(new CodegenRw(), source, { index: 4 }).then(
            (data) => console.log(data)
        );
    });

    test(".get column position (MUI DataTable with formatter)", async () => {
        const filePath = 'src/codegen/tests/list/files/data-table-mui-with-formatter-test-file.txt'
        const source: SourceLineCol = { lineNumber: 16, columnNumber: 77, fileName: filePath }
        const result = await getColumnSourcePosition(new CodegenRw(), source, { index: 7 });

        expect(result).toStrictEqual({
            columnPosition: {
                fileName: filePath,
                columnNumber: 13,
                lineNumber: 14,
                length: 215
              },
              headerPosition: {
                fileName: filePath,
                columnNumber: 113,
                lineNumber: 14,
                length: 113
              },
              valuePosition: {
                fileName: filePath,
                columnNumber: 58,
                lineNumber: 14,
                length: 53
              }
        })
    }); 

    test(".get Widget Fields (MUI TextField)", async () => {
        const filePath = 'src/codegen/tests/detail/detail-test-file.txt'
        const source: SourceLineCol = { lineNumber: 80, columnNumber: 19, fileName: filePath }
        const result = await getFormWidgetProperties(new CodegenRw(), source);

        expect(result.properties).toStrictEqual(
            [
                {
                    name: "fullWidth",
                    value: "true"
                },
                {
                    name: "required",
                    value: "true"
                },
                {
                    name: "disabled",
                    value: "false"
                },
                {
                    name: "rows",
                    value: "10"
                },
                {
                    name: "id",
                    value: "updatedAt"
                },
                {
                    name: "type",
                    value: "date"
                },
                {
                    name: "label",
                    value: "updatedAt"
                }
            ]
        );
    }); 
    
    test(".set Widget Fields (MUI TextField)", async () => {
        const properties =             [
            {
                name: "fullWidth",
                value: "false"
            },
            {
                name: "required",
                value: "false"
            },
            {
                name: "disabled",
                value: "true"
            },
            {
                name: "rows",
                value: "5"
            },
            {
                name: "id",
                value: "updatedAtTime"
            },
            {
                name: "type",
                value: "time"
            },
            {
                name: "label",
                value: "updatedAtTime"
            }
        ];

        const filePath = 'src/codegen/tests/detail/detail-test-file.txt'
        const source: SourceLineCol = { lineNumber: 80, columnNumber: 19, fileName: filePath }
        const result = await setFormWidgetProperties(new CodegenRw(), source, { properties: properties });

        console.log(result);
    });  
});
import fs from 'fs'
import path from 'path'
import { addColumn, addFormInput, deleteColumn, getColumnSourcePosition, isSelectedDataTable, isSelectedFormWidget } from '../..';
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

        addColumn(graphqlGenTs1, new CodegenRw(), source, {property: 'testdate', entity: 'Customer'}).then(generated => console.log(generated))
    });

    test(".add form input", () => {
        const filePath = 'src/codegen/tests/detail/detail-test-file.txt'
        const source : SourceLineCol = {lineNumber: 69, columnNumber:17, fileName:filePath}

        addFormInput(graphqlGenTs1, new CodegenRw(), source, {property: 'test2', entity: 'Customer'}).then(generated => console.log(generated))
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
                lineNumber: 14
              },
              headerPosition: {
                fileName: filePath,
                columnNumber: 113,
                lineNumber: 14
              },
              valuePosition: {
                fileName: filePath,
                columnNumber: 58,
                lineNumber: 14
              }
        })
    }); 
});
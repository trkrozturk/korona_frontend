import React from "react";
import { Table } from "semantic-ui-react";

const CustomTable = ({ data }) => (
  <Table celled fixed singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Şehir</Table.HeaderCell>
        <Table.HeaderCell>Tarih</Table.HeaderCell>
        <Table.HeaderCell>Vaka</Table.HeaderCell>
        <Table.HeaderCell>Vefat</Table.HeaderCell>
        <Table.HeaderCell>Taburcu</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {data.map((item) => {
        return (
          <Table.Row>
            <Table.Cell>{item.sehir}</Table.Cell>
            <Table.Cell>{item.tarih}</Table.Cell>
            <Table.Cell>{item.vaka}</Table.Cell>
            <Table.Cell>{item.vefat}</Table.Cell>
            <Table.Cell>{item.taburcu}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);

export default CustomTable;

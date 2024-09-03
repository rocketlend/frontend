import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
} from "../table";
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationPage,
  PaginationList,
  PaginationGap,
} from "../pagination";
import { poolData } from "../../../mocks/explorerMocks";

// TODO: these table headers are guesswork; determine what should actually go here and how the data will be fetched/parsed
// TODO: sorting, searching, styling
const ExplorerTable = () => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Address</TableHeader>
            <TableHeader>Available RPL</TableHeader>
            <TableHeader>Utilization Rate</TableHeader>
            <TableHeader>APR</TableHeader>
            <TableHeader># of Borrowers</TableHeader>
            <TableHeader>Creation Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {poolData.map((pool, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>{pool.address}</TableCell>
                <TableCell>{pool.availableToBorrow}</TableCell>
                <TableCell>{pool.utilizationRate}</TableCell>
                <TableCell>{pool.borrowingAPR}</TableCell>
                <TableCell>{pool.numberOfBorrowers}</TableCell>
                <TableCell>{pool.creationDate}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationPrevious />
        <PaginationNext />
      </Pagination>
    </>
  );
};

export default ExplorerTable;
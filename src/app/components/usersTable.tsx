import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { FaBan, FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
  
  const actions = [
    {
      name: "View",
      icon: <FaEye />,
      color: "text-blue-400",
    },
    {
      name: "Edit",
      icon: <FaPencilAlt />,
      color: "text-yellow-400",
    },
    {
      name: "Suspend",
      icon: <FaBan />,
      color: "text-orange-400",
    },
    {
      name: "Delete",
      icon: <FaTrash />,
      color: "text-red-400",
    },
  ];
  
  interface userInterface {
    Placeholder: string;
    users: {
      userId: string;
      firstName: string;
      lastName:string,
      role: string;
    }[];
  }
  
  export function UsersTable({ Placeholder, users }: userInterface) {
    return (
      <Table className="table-fixed overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>UserID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>{Placeholder}</TableHead>
            <TableHead>Perform Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell className="text-[12px] md:text-[14px]">{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right flex items-center gap-[8px]">
                {actions.map((action, index) => (
                  <p
                    key={index}
                    className={`${action.color} cursor-pointer flex items-center text-[12px] gap-[8px]`}
                  >
                    <span className="hidden md:block">{action.name}</span>
                    {action.icon}
                  </p>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
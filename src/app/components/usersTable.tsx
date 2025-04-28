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
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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
    filterItems: string[],
    users: {
      userId: string;
      firstName: string;
      lastName:string;
      role: string;
      classCategory:string;
      subject:string;
      active:string;
    }[];
  }
  
  export function UsersTable({ Placeholder, users, filterItems}: userInterface) {
    return (
    <>
    <form className="py-[8px] flex justify-between flex-col md:flex-row gap-[8px]">
        <div className="flex gap-[8px]">
            <input type="text" placeholder="Find user with their name or id" className=" xl:w-[350px] w-[100%] border-1 border-gray-200 outline-non px-[36px] py-[8px] bg-white rounded-[8px] "/>
            <button className="text-white bg-orange-500 border-none rounded-[8px] px-[16px] outline-none">Serach</button>
        </div>
        <Select >
          <SelectTrigger className="md:w-[300px] lg:w-[350px] w-[100%] outline-none border-1 border-gray-200">
            <SelectValue placeholder='Filter' />
          </SelectTrigger>
          <SelectContent>
            {
                filterItems.map((item)=>(
                    <SelectItem value={item}>{item}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
    </form>
    <section className="bg-gray-100 rounded-md over-flow-x-scroll w-[full] px-4">
      <Table className="table-fixed overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>UserID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>{Placeholder}</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Perform Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell className="text-[12px] md:text-[14px]">{user.firstName} {user.lastName}</TableCell>
              <TableCell>{Placeholder === "Role" ? user.role :  user.classCategory }</TableCell>
              <TableCell>{user.active ? "active" : "Suspended"}</TableCell>
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
      </section>
      </>
    );
  }
  
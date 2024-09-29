import { Badge, Button, List, Select, Tooltip } from "antd";
import { MdFavorite, MdFavoriteBorder, MdOutlineSwapHoriz } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { ToDoItem } from "../../../models/ToDoItem";
import { useTheme } from "../../../contexts/ThemeContext";

const { Option } = Select;

interface ToDoListItemProps {
    item: ToDoItem;
    selectedToDo: (id: number) => void;
    switchToDoStatus: (id: number, value: string) => void;
    favoriteToDo: (id: number) => void;
    deleteToDoItem: (id: number) => void;
}

export const ToDoListItem: React.FC<ToDoListItemProps> = ({
    item,
    selectedToDo,
    switchToDoStatus,
    favoriteToDo,
    deleteToDoItem
}) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'TODO':
                return <Badge status="error" text="Pendente" />;
            case 'IN_PROGRESS':
                return <Badge status="warning" text="Em Andamento" />;
            case 'DONE':
                return <Badge status="success" text="Concluído" />;
            default:
                return null;
        }
    };

    const { palette, theme } = useTheme();

    return (
        <Tooltip title="Clique para editar...">
            <List.Item
                key={item.id}
                onClick={() => selectedToDo(item.id)}
                className={
                    theme === "dark" ? 'mr-5 ml-2 overflow-hidden rounded-md transition-all duration-700 cursor-pointer hover:bg-slate-800' :
                    'mr-5 ml-2 rounded-md transition-all duration-700 cursor-pointer overflow-hidden hover:bg-slate-300'
                }
            >
                <div style={{ flex: 1 }} 
                    className="mr-5 ml-2 overflow-hidden rounded-md transition-all duration-700 p-2"
                >
                    <strong className="text-sm" style={{ color: palette.fontColor}}>{item.title}</strong>
                    <p className="text-xs" style={{ color: palette.subFontColor}}>{item.description}</p>
                    <p
                        className={
                            item.taskStatus === 'TODO'
                                ? "text-xs text-red-500 mt-2"
                                : item.taskStatus === 'IN_PROGRESS'
                                    ? "text-xs text-yellow-500 mt-2"
                                    : "text-xs text-green-500 mt-2"
                        }
                    >
                        <Badge
                            status={
                                item.taskStatus === 'TODO'
                                    ? 'error'
                                    : item.taskStatus === 'IN_PROGRESS'
                                        ? 'warning'
                                        : 'success'
                            }
                            className="mr-1"
                        />
                        Status: {item.taskStatus}
                    </p>
                </div>
                <div className="flex space-x-2 mr-2">
                    <Select
                        value={item.taskStatus}
                        onChange={(value) => switchToDoStatus(item.id, value)}
                        onClick={(e) => e.stopPropagation()}
                        className="custom-select-status"
                        popupMatchSelectWidth={false}
                        style={{ minWidth: 20 }}
                        suffixIcon={<MdOutlineSwapHoriz />}
                    >
                        <Option value="TODO">{getStatusBadge("TODO")}</Option>
                        <Option value="IN_PROGRESS">{getStatusBadge("IN_PROGRESS")}</Option>
                        <Option value="DONE">{getStatusBadge("DONE")}</Option>
                    </Select>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            favoriteToDo(item.id);
                        }}
                        icon={
                            item.favorite === true ? (
                                <MdFavorite className="text-blue-500" />
                            ) : (
                                <MdFavoriteBorder className="text-blue-500" />
                            )
                        }
                    ></Button>
                    <Button
                        onClick={(e) => { 
                            e.stopPropagation();
                            deleteToDoItem(item.id)
                        }}
                        icon={<TiDelete className="text-red-500" />}
                    ></Button>
                </div>
            </List.Item>
        </Tooltip>
    );
};

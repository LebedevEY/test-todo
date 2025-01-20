import './index.css'
import {Button, Checkbox, Form, Input, List, Modal} from "antd";
import {useEffect, useState} from "react";

type TodoType = {
    id: number
    text: string
    done: boolean
}

function App() {
    const storageList = window.localStorage.getItem("todolist");
    const [todoList, setTodoList] = useState<TodoType[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    }

    const handleConfirm = () => {
        const {text} = form.getFieldsValue();
        setTodoList((prev) => {
            const newTodoList = [{text: text, done: false, id: Math.random()}, ...prev];
            window.localStorage.setItem("todolist", JSON.stringify(newTodoList));
            return newTodoList;
        });
        form.resetFields();
        toggleModal();
    }

    const handleCheck = (todo: TodoType) => {
        const idx = todoList.indexOf(todo);
        const newTodo = {...todoList.splice(idx, 1)[0], done: true}
        const newTodoList = [...todoList, newTodo]
        localStorage.setItem("todolist", JSON.stringify(newTodoList));
        setTodoList(newTodoList);
    }

    useEffect(() => {
        if (storageList) {
            setTodoList(JSON.parse(storageList));
        }
    }, []);

    return (
        <div className={'layout'}>
            <h1>Test TODO</h1>
            <Button onClick={toggleModal} type={"primary"}>Добавить</Button>
            <Modal
                destroyOnClose
                width={800}
                closable={false}
                open={openModal}
                onClose={toggleModal}
                onCancel={toggleModal}
                onOk={handleConfirm}
            >
                <Form form={form}>
                    <Form.Item name={'text'}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <List
                style={{width: '100%'}}
                size={'large'}
                bordered={true}
                itemLayout={'vertical'}
                dataSource={todoList}
                renderItem={(item) => (
                    <div key={item.id} className={'todo_item'}>
                        <Checkbox onChange={() => handleCheck(item)} checked={item.done} />
                        <p className={`todo_text ${item.done ? 'todo_text-done' : ''}`}>{item.text}</p>
                    </div>
                )}
            />
        </div>
  )
}

export default App

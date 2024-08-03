const [inputValue, setInputValue] = useState("");

const handleChange = (e) => {
    setInputValue(e.target.value);
}

export {inputValue, handleChange}
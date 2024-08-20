const Inputbox = ({name,type,id,value,placeholder}) => {
    return(
        <div className="relative w-[100%] mb-4">
            <Input 
                name={name}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="Input-box"
            />
        </div>
        
    )
}

export default Inputbox; 
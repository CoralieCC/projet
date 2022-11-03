export const customStyles = {
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#e1d9c8" : "#fff",
      color:"#000",
      "&:hover": {
        backgroundColor: state.isFocused ? "#e1d9c8" : "#fff"
      }
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      backgroundColor: "#fff",
      zIndex: 1000
    }),
    menuList: (base) => ({
      ...base,
      padding:0,
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    }),
    control: (base, state) => ({
      ...base,
      height:'58px',
      border: state.isFocused ? "1px solid black" : "1px solid rgb(222, 223, 224)",
      boxShadow: "none",
      //outline: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "black" : "none",
        outline: state.isFocused ? "none" : "none",
      }
    }),
    input: (base) => ({
      ...base,
      color: "rgba(0, 0, 0, 0.54)",
      height: '58px',
      margin:0,
      padding:0
    }),
    singleValue: (base) => ({
      ...base,
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight:700,
      fontSize:"1.4rem"
    }),
    container: (base) => ({
      ...base,
      height:'58px'
    }),
    valueContainer: (base) => ({
      ...base,
      height:"58px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: '58px'
    })

    
  }
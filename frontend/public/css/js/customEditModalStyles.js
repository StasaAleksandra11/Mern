const customEditModalStyles = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000, 
    },
    content: {
       
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative', 

        inputWrapper: {
                display: "flex",
                flexDirection: "column",
                marginBottom: "12px",
                justifyContent: 'between'
              },
    },
        formControl: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
       

};

//  const modalStyles = {
//   content: {
//     maxWidth: "500px",
//     width: "90%",
//     padding: "24px",
//     borderRadius: "12px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   overlay: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   inputWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "12px",
//   },
// };








export default customEditModalStyles;

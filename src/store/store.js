const ss = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) :
    {
        user: {
            name: "",
        }
    };

export default ss
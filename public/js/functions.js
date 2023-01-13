function add_param_user_id(){
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const user_id = params.get('user_id');

    if (user_id !== null) {
        const a_HTMLColection = document.getElementsByTagName('a');
        for (const element of a_HTMLColection) {
            element.href += "?user_id=" + user_id;
        }
    }
}

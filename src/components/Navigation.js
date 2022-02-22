class Navigation extends Component {
    state = {  } 
    render() { 
        return (

            <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-3">
            <a className="navbar-brand" href="/"><i className="fa fa-cog fa-spin"></i> React Flix</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item text-light">
                    <NavLink as={NavLink} to='/home' className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item text-light">
                    <NavLink as={NavLink} to='/movies' className="nav-link">Movies</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    {authLink}
                </li>
            </ul>
            </div>
            </nav>
            
        );
    }
}
 
export default Navigation;
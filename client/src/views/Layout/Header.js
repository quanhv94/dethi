import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input
} from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import SimpleLineIcon from 'react-simple-line-icons'
import qs from 'qs'

class Headers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  changeSearchParam = (e) => {
    this.setState({ q: e.target.value })
  }
  search = (e) => {
    e.preventDefault()
    this.props.history.push(`/search?q=${this.state.q}`)
  }
  componentDidMount() {
    let search = this.props.location.search.slice(1)
    let q = qs.parse(search).q
    this.setState({ q })
  }

  render() {
    const props = this.props
    const user = this.props.auth.user
    return (
      <header>
        <Navbar color="dark" dark expand="md">
          <Link to="/" className="navbar-brand">DeThiOnline</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav>
              <Form
                className='header-search-form'
                onSubmit={this.search}
              >
                <SimpleLineIcon name='magnifier' />
                <Input
                  defaultValue={this.state.q}
                  onChange={this.changeSearchParam}
                />
              </Form>
            </Nav>
            {user && <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.fullName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => { props.history.push('/profile') }}>
                    Tài khoản
                  </DropdownItem>
                  <DropdownItem onClick={() => { props.history.push('/exam-history') }}>
                    Lịch sử làm bài
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={props.logout}>
                    Đăng xuất
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>}
          </Collapse>
        </Navbar>
      </header >
    )
  }
}

export default withRouter(Headers)

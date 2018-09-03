import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux";


const withErrorHandler = (WrappedElement, axios ) => {
        return class extends Component {
            state ={
               error: null
            }

            componentDidMount() {
                axios.interceptors.request.use(req => {
                    this.setState({
                        error: null
                    });

                    return req;
                });
                axios.interceptors.response.use(res => res, err => {
                    this.setState({
                        error: err
                    });
                });
            }

            errorConfirmedHandler = () => {
                this.setState({
                    error: null
                });
            }

            render() {
                return (
                    <Aux>
                        <Modal
                            show={ this.state.error }
                            clicked={ this.errorConfirmedHandler }
                        >
                            { this.state.error ? this.state.error.message : null }
                        </Modal>
                        <WrappedElement  { ...this.props}/>
                    </Aux>
                );
            }
        }
}

export default withErrorHandler;
import { useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import ChannelContainer from '../Component/ChannelContainer';
import ChannelItem from '../Component/ChannelItem';
import Modal from '../Component/Modal';
import ChannelForm from '../Form/ChannelForm';
import { GET_CHANNEL } from '../Queries/ChannelQuery';
import {useAuth} from '../Auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import PopupAlert from '../Component/PopupAlert/PopupAlert.js';
import Close from '../Component/PopupAlert/img/close.png';
import Spiner from "../Component/Spiner/Spiner";

function Channel() {
    const [displayAddChannelModal, setDisplayAddChannelModal] = useState(false);
    const [displaySetChannelModal, setDisplaySetChannelModal] = useState(false);
    const [channelFormInput, setChannelFormInput] = useState({
        id: "",
        channelName: "",
    });
    const auth = useAuth();
    const { loading, error, data, refetch, startPolling, stopPolling } = useQuery(GET_CHANNEL);
    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        startPolling(3000);
        return () => stopPolling();
    }, [startPolling, stopPolling]);

    if (loading) return <Spiner duration="1s" size="10px" color="#eceefd"/>;
    if (error){
        if(error.message == "Failed to fetch"){
            return <PopupAlert icon={Close} msg="Connexion échouée" />
        } else if (error.message == "You must be connected !") {
             stopPolling();
             auth.logout();
            return <PopupAlert icon={Close} msg={error.message} redirectTo="/signin" buttonLabel="Sign in" />;
        }
        return <PopupAlert icon={Close} msg={error.message} redirectTo="/signin" buttonLabel="Sign in" />;
    }
    const dispalayChannelModal = (data) => {
        if (data !== undefined) {
            setDisplaySetChannelModal(true);
            if (data !== null) {
                setChannelFormInput({
                    id: data.id,
                    channelName: data.name
                });
            }
        } else {
            setDisplayAddChannelModal(true);
            resetChannelForm();
        }
    }
    const closeChannelModal = () => {
        setDisplaySetChannelModal(false);
        setDisplayAddChannelModal(false);
    }
    const resetChannelForm = () => {
        setChannelFormInput({ id: "", channelName: "" });
    }
    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const formInputEdit = { ...channelFormInput };
        formInputEdit[name] = value;
        setChannelFormInput(formInputEdit);
    }
    return (
        <Fragment>
            {auth.user == null ? <Redirect to="/" /> : ""}
            <Modal title="Ajouter channel" visible={displayAddChannelModal}
                closeModal={closeChannelModal}
            >
                <ChannelForm
                    type="add"
                    formInput={channelFormInput}
                    handleInputChange={handleInputChange}
                    resetForm={resetChannelForm}
                    refetch={refetch}
                    closeChannelModal={closeChannelModal}
                />
            </Modal>
            <Modal title="Modifier channel" visible={displaySetChannelModal}
                closeModal={closeChannelModal}
            >
                <ChannelForm
                    type="set"
                    formInput={channelFormInput}
                    handleInputChange={handleInputChange}
                    resetForm={resetChannelForm}
                    refetch={refetch}
                    closeChannelModal={closeChannelModal}
                />
            </Modal>
            <ChannelContainer dispalayChannelModal={dispalayChannelModal}>
                {
                    data.channels != null ?
                    data.channels.map(channel => <ChannelItem
                        key={channel.id}
                        data={channel}
                        dispalayChannelModal={dispalayChannelModal}
                        refetch={refetch} />)
                    : ""
                }
            </ChannelContainer>
        </Fragment>
    )
}

export default Channel

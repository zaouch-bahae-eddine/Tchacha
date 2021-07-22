import { useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react';
import ChannelContainer from '../Component/ChannelContainer';
import ChannelItem from '../Component/ChannelItem';
import Modal from '../Component/Modal';
import ChannelForm from '../Form/ChannelForm';
import { GET_CHANNEL } from '../Queries/ChannelQuery';
import {useAuth} from '../Auth/AuthProvider';

function Channel() {
    const [displayAddChannelModal, setDisplayAddChannelModal] = useState(false);
    const [displaySetChannelModal, setDisplaySetChannelModal] = useState(false);
    const [channelFormInput, setChannelFormInput] = useState({
        id: "",
        channelName: "",
    });
    const auth = useAuth();
    const { loading, error, data, refetch } = useQuery(GET_CHANNEL, {
        pollInterval: 3000,
    });
    useEffect(() => {
        refetch();
        console.log('the first rerender', auth.user.id);
    }, []);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
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
            console.log(channelFormInput);
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
        console.log(formInputEdit);
        setChannelFormInput(formInputEdit);
    }
    return (
        <Fragment>

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

import { useMutation, useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'
import AlertMessage from '../Component/AlertMessage';
import MessageContainer from '../Component/MessageContainer';
import MessageInput from '../Component/MessageInput';
import MessageItem from '../Component/MessageItem';
import Modal from '../Component/Modal';
import PopupAlert from '../Component/PopupAlert/PopupAlert';
import MemberForm from '../Form/MemberFrom';
import MessageForm from '../Form/MessageForm';
import { GET_CHANNEL_BY_ID } from '../Queries/ChannelQuery';
import { ADD_MESSAGE, GET_MESSAGE } from '../Queries/MessageQuery';
import Close from '../Component/PopupAlert/img/close.png';
import Spiner from "../Component/Spiner/Spiner";

function Tchatchat() {
    const auth = useAuth();
    const { id } = useParams();
    const [displayModal, setDisplayModal] = useState(false);
    const [formInput, setFormInput] = useState({
        id: "",
        message: ""
    });
    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const formInputEdit = { ...formInput };
        formInputEdit[name] = value;
        setFormInput(formInputEdit);
    }
    const showModal = (data) => {
        setFormInput({
            id: data.id,
            message: data.message
        });
        setDisplayModal(true);
    }
    const closeModal = () => {
        setDisplayModal(false);
    }
    const [AddMessageMutation] = useMutation(ADD_MESSAGE);
    const sendMessage = (message) => {
        AddMessageMutation({
            variables: {
                addMessageChannel: id,
                addMessageText: message
            }
        });
    }

    /* ADDING MEMBER */
    const [displayAddMemberModal, setDisplayAddMemberModal] = useState(false);
    const [memberFormInput, setMemberFormInput] = useState({
        memberId: "",
        memberName: "",
        memberEmail: "",
        channelId: id
    });

    const dispalayMemberModal = () => {
        setDisplayAddMemberModal(true);
    }
    const closeMemberModal = () => {
        setDisplayAddMemberModal(false);
        resetMemberForm();
    }

    const resetMemberForm = () => {
        const formInput = { ...memberFormInput };
        formInput["memberEmail"] = "";
        setMemberFormInput(formInput);
    }
    const handleInputMemberChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const formInput = { ...memberFormInput };
        formInput[name] = value;
        setMemberFormInput(formInput);
    }
    /* ADDING MEMBER */
    const { loading, error, data, refetch, startPolling, stopPolling } = useQuery(GET_MESSAGE, {
        variables: { getMessageChannel: id }
    });
    useEffect(() => {
        startPolling(3000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])
    const channel = useQuery(GET_CHANNEL_BY_ID, { variables: { getChaneByIdChannelId: id } })
    if (loading || channel.loading) return <Spiner duration="1s" size="10px" color="#eceefd"/>;
    if (error || channel.error) {
        if (error.message == "Failed to fetch") {
            alert('cnx');
            return <PopupAlert icon={Close} msg="Connexion échouée" />
        } else if (error.message == "You must be connected !") {
            stopPolling();
            auth.logout();
            return <PopupAlert icon={Close} msg={error.message} redirectTo="/signin" buttonLabel="Sign in" />;
        }
    }

    return (
        <Fragment>
            {auth.user == null ? <Redirect to="/" /> : ""}
            <Fragment>
                <Modal visible={displayModal} title="Modifier Message" closeModal={closeModal} >
                    <MessageForm formInput={formInput} handleInputChange={handleInputChange} refetch={refetch} close={closeModal} />
                </Modal>
                <Modal title="Ajouter membre" visible={displayAddMemberModal}
                    closeModal={closeMemberModal}
                >
                    <MemberForm
                        type="add"
                        formInput={memberFormInput}
                        handleInputChange={handleInputMemberChange}
                        resetForm={resetMemberForm}
                        refetch={refetch}
                        closeMemberModal={closeMemberModal}
                    />
                </Modal>
                <MessageContainer homeBackLink={true} columnTitle={channel.data.channel.name} dispalayMemberModal={dispalayMemberModal}>
                    {
                        data.messages.map(msg => {
                            return (<MessageItem key={msg.message.id} data={msg} showModal={showModal} refetch={refetch} />)
                        })
                    }
                    <MessageInput refetch={refetch} send={sendMessage} />
                </MessageContainer>
            </Fragment>
        </Fragment>
    )
}

export default Tchatchat

import { useQuery } from '@apollo/client';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../Auth/AuthProvider';
import MemberContainer from '../Component/MemberContainer';
import MemberItem from '../Component/MemberItem';
import Modal from '../Component/Modal';
import MemberForm from '../Form/MemberFrom';
import { GET_CHANNEL_BY_ID, GET_CHANNEL_OWNER, MEMBERS_CHANNEL } from '../Queries/ChannelQuery';
import Close from '../Component/PopupAlert/img/close.png';
import PopupAlert from '../Component/PopupAlert/PopupAlert';
import Spiner from '../Component/Spiner/Spiner';

function Member() {
    const auth = useAuth();
    let { id } = useParams();
    const [displayAddMemberModal, setDisplayAddMemberModal] = useState(false);
    const [memberFormInput, setMemberFormInput] = useState({
        memberId: "",
        memberName: "",
        memberEmail: "",
        channelId: id
    });

    const { loading, error, data, refetch } = useQuery(MEMBERS_CHANNEL, { variables: { getMembersChannel: id } });
    useEffect(() => {
        refetch();
    }, [])
    const getChannelById = useQuery(GET_CHANNEL_BY_ID, { variables: { getChaneByIdChannelId: id } });
    const getChannelOwner = useQuery(GET_CHANNEL_OWNER, { variables: { getChannelOwnerChannelId: id } });
    if (loading || getChannelById.loading || getChannelOwner.loading) return <Spiner duration="1s" size="10px" color="#eceefd"/>;
    if (error || getChannelById.error || getChannelOwner.error) {
        if (error.message == "Failed to fetch" || getChannelById.error.message == "Failed to fetch") {
            return <PopupAlert icon={Close} msg="Connexion échouée" />
        } else if (error.message == "You must be connected !" || getChannelById.error.message == "You must be connected !") {
            auth.logout();
            return <PopupAlert icon={Close} msg={error.message} redirectTo="/signin" buttonLabel="Sign in" />;
        }
        return <PopupAlert icon={Close} msg={error.message} redirectTo="/signin" buttonLabel="Sign in" />;
    };

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

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const formInput = { ...memberFormInput };
        formInput[name] = value;
        setMemberFormInput(formInput);
    }
    let admin = false;
    if(auth.user.id == getChannelOwner.data.owner.id){
        admin = true;
    }
    return (
        <div>
            <Fragment>
                {auth.user == null ? <Redirect to="/" /> : ""}
                <Modal title="Ajouter membre" visible={displayAddMemberModal}
                    closeModal={closeMemberModal}
                >
                    <MemberForm
                        type="add"
                        formInput={memberFormInput}
                        handleInputChange={handleInputChange}
                        resetForm={resetMemberForm}
                        refetch={refetch}
                        closeMemberModal={closeMemberModal}
                    />
                </Modal>

                <MemberContainer owner={admin} homeBackLink={true} colomunTitle={getChannelById.data.channel.name} dispalayMemberModal={dispalayMemberModal}>
                    {
                        data.members != null ?
                            data.members.map(member => {
                                return <MemberItem
                                    data={member}
                                    key={member.id}
                                    refetch={refetch}
                                    channelId={id}
                                    owner={admin}
                                />
                            })
                            : ""
                    }
                </MemberContainer>
            </Fragment>
        </div>
    )
}

export default Member

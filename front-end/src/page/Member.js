import { useQuery } from '@apollo/client';
import React, { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MemberContainer from '../Component/MemberContainer';
import Modal from '../Component/Modal';
import MemberForm from '../Form/MemberFrom';
import { GET_CHANNEL_BY_ID, MEMBERS_CHANNEL } from '../Queries/ChannelQuery';

function Member() {
    let { id } = useParams();
    const [displayAddMemberModal, setDisplayAddMemberModal] = useState(false);
    const [memberFormInput, setMemberFormInput] = useState({
        memberId: "",
        memberName: "",
        memberEmail: "",
        channelId: id
    });

    const { loading, error, data, refetch } = useQuery(MEMBERS_CHANNEL, { variables: { getMembersChannel: id } });
    const getChannelById = useQuery(GET_CHANNEL_BY_ID, { variables: { getChaneByIdChannelId: id } });
    if (loading || getChannelById.loading) return 'Loading...';
    if (error || getChannelById.error) return `Error! ${error.message}`;

    const dispalayMemberModal = () => {
        setDisplayAddMemberModal(true);
    }
    const closeMemberModal = () => {
        setDisplayAddMemberModal(false);
        resetMemberForm();
    }

    const resetMemberForm = () => {
        const formInput = {...memberFormInput};
        formInput["memberEmail"] = "";
        setMemberFormInput(formInput);
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        const formInput = { ...memberFormInput };
        formInput[name] = value;
        console.log(formInput);
        setMemberFormInput(formInput);
    }

    return (
        <div>
            <Link to="/" > Retour</Link>
            <Fragment>
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

                <MemberContainer colomunTitle={getChannelById.data.channel.name} dispalayMemberModal={dispalayMemberModal}>
                    {
                        data.members.map(member => <div key={member.id}> {member.name} {member.email}</div>)
                    }
                </MemberContainer>
            </Fragment>
        </div>
    )
}

export default Member

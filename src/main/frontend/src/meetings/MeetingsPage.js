import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);


    async function fetchMeetings() {
        const response = await fetch(`/api/meetings`);
        if (response.ok) {
            const data = await response.json();
            setMeetings(data);
        }
    }


    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            await fetchMeetings();   // 👈 kluczowe
            setAddingNewMeeting(false);
        } else {
            alert("Błąd tworzenia spotkania");
        }
    }

    async function handleSavingToMeeting(meeting) {

        const response = await fetch(
            `/api/meetings/${meeting.id}/participants/${username}`,
            {
                method: 'POST'
            }
        );

        if (response.ok) {
            await fetchMeetings();
            alert("Zapisano na spotkanie");
        } else {
            alert("Błąd zapisu");
        }
    }


    useEffect(() => {

        fetchMeetings();
    }, [username]);


    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {

            await fetchMeetings();
        }
    }


    async function handleLeavingMeeting(meeting) {
        const response = await fetch(
            `/api/meetings/${meeting.id}/participants/${username}`,
            {
                method: 'DELETE'
            }
        );

        if (response.ok) {
            console.log("Wypisano ze spotkania");
            await fetchMeetings();
        }
    }


    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings}
                              username={username}
                              onDelete={handleDeleteMeeting}
                              saveToMeeting={handleSavingToMeeting}
                              leaveFromMeeting={handleLeavingMeeting}

                />}
        </div>
    )


}

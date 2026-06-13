import { useState } from "react";

import "./MeetingsList.css"


export default function MeetingsList({meetings, onDelete, saveToMeeting, leaveFromMeeting, username}) {

    const [expanded, setExpanded] = useState({});


    function toggle(meetingId) {
        setExpanded(prev => ({
            ...prev,
            [meetingId]: !prev[meetingId]
        }));
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Akcja</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting) => {

                    const participants = meeting.participants || [];
                    const count = participants.length;
                    const isOpen = expanded[meeting.id];

                    const enrolled = meeting.participants?.some(p => {

                        return p.login === username;
                    });

                    return (
                        <tr key={meeting.id}>
                            <td>{meeting.title}</td>
                            <td>{meeting.description}</td>
                            <td>

                                Liczba uczestników: {count}

                                <button
                                    type="button"
                                    onClick={() => toggle(meeting.id)}
                                    style={{marginLeft: "10px"}}
                                >
                                    {isOpen ? "Zwiń" : "Rozwiń"}
                                </button>

                                {isOpen && (
                                    <div style={{marginTop: "5px"}}>
                                        {participants.length === 0 ? (
                                            <small>Brak uczestników</small>
                                        ) : (
                                            <ul>
                                                {participants.map(p => (
                                                    <li key={p.login}>
                                                        {p.login}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </td>


                            <td>

                                {!enrolled ? (
                                    <button
                                        type="button"
                                        onClick={() => saveToMeeting(meeting)}>
                                        Zapisz się
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => leaveFromMeeting(meeting)}
                                        className="button button-outline"
                                    >
                                        Wypisz się
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="button button-outline button-red"
                                    onClick={() => onDelete(meeting)}>
                                    Usuń
                                </button>

                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
}

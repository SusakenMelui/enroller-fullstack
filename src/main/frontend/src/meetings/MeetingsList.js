import "./MeetingsList.css"
export default function MeetingsList({meetings, onDelete, saveToMeeting, leaveFromMeeting, username}) {
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
                meetings.map((meeting, index) => {



                    const enrolled = meeting.participants?.some(p => {

                        return p.login === username;
                    });

                    return (
                        <tr key={index}>
                            <td>{meeting.title}</td>
                            <td>{meeting.description}</td>
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

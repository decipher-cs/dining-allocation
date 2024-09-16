import { useEffect, useState } from 'react'

function App() {
    const [allotmentConfirmationDialog, setAllotmentConfirmationDialog] = useState(true)
    const [allotmentStatus, setAllotmentStatus] = useState<'loading' | 'success' | 'failed' | 'uninitiated'>(
        'uninitiated'
    )

    const reserveSeat = (seatNum: number) => {
        setAllotmentConfirmationDialog(true)
        setAllotmentStatus('loading')
    }

    useEffect(() => {
        let id = undefined
        if (allotmentStatus === 'loading') {
            id = setTimeout(() => {
                setAllotmentStatus('success')
            }, 1000 * 3)
        }
        return () => {
            clearTimeout(id)
        }
    }, [allotmentStatus])

    return (
        <main>
            <form
                className="grid"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <label>
                    Name <input type="text" />
                </label>

                <label>
                    Phone no. <input type="tel" />
                </label>

                <label>
                    Email <input type="email" />
                </label>

                <label>
                    Duration <input type="range" />
                </label>

                <label>
                    Date and time <input type="datetime-local" />
                </label>

                <label htmlFor="available-table">
                    Available Table
                    <select name="available-table">
                        {[1, 2, 3].map((value) => (
                            <option key={value}>Table no. {value}</option>
                        ))}
                    </select>
                </label>

                <button type="submit">Continue</button>
            </form>

            <section
                className="grid gap-2 max-w-screen-lg"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 100px))' }}
            >
                {Array(20)
                    .fill(' ')
                    .map((_, tableNum) => {
                        const seatAvailable = Boolean(Math.floor(Math.random() * 2))
                        return (
                            <button
                                disabled={!seatAvailable}
                                key={tableNum}
                                className={[
                                    seatAvailable ? 'bg-green-400 cursor-pointer' : 'bg-red-400 cursor-not-allowed',
                                ].join(' ')}
                                type="button"
                                onClick={() => {
                                    reserveSeat(tableNum)
                                }}
                            >
                                {tableNum}
                            </button>
                        )
                    })}
            </section>

            {allotmentConfirmationDialog && (
                <dialog
                    open={allotmentConfirmationDialog}
                    className="h-svh w-full absolute inset-0 grid place-content-center"
                    style={{
                        backdropFilter: 'blur(4px) saturate(80%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <button
                        className="p-2 bg-black text-white"
                        onClick={() => setAllotmentConfirmationDialog(false)}
                        aria-label="close dialog"
                    >
                        Close X
                    </button>

                    {allotmentStatus === 'loading' && <div className="bg-white w-fit p-4">Loading...</div>}
                    {allotmentStatus === 'failed' && (
                        <div className="bg-white w-fit p-4">Sorry try some other table</div>
                    )}
                    {allotmentStatus === 'success' && <div className="bg-white w-fit p-4">Successful ✅</div>}
                </dialog>
            )}
        </main>
    )
}

export default App

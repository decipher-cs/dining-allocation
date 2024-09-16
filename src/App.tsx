import { useEffect, useState } from 'react'

const TOTAL_TABLES = 20

function App() {
    const [allotmentConfirmationDialog, setAllotmentConfirmationDialog] = useState(false)
    const [allotmentStatus, setAllotmentStatus] = useState<'loading' | 'success' | 'failed' | 'uninitiated'>(
        'uninitiated'
    )

    const reserveSeat = (seatNum: number) => {
        setAllotmentConfirmationDialog(true)
        setAllotmentStatus('loading')
    }

    /* In a real life scenario this will be an API call to the server */
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
                    Duration (min) <input type="range" max={120} min={15} />
                </label>

                <label>
                    Date and time{' '}
                    <input
                        type="datetime-local"
                        min={(() => {
                            const date = new Date().toLocaleDateString('en-ca')
                            const time = new Date().toLocaleTimeString('en-ca', { hour12: false })
                            return date + 'T' + time
                        })()}
                        max={(() => {
                            const date = new Date().toLocaleDateString('en-ca')
                            const time = new Date(Date.now() + 1000 * 60 * 60 * 2).toLocaleTimeString('en-ca', {
                                hour12: false,
                            })
                            return date + 'T' + time
                        })()}
                    />
                </label>

                {/* <label htmlFor="available-table"> */}
                {/*     Available Table */}
                {/*     <select name="available-table"> */}
                {/*         {Array(TOTAL_TABLES) */}
                {/*             .fill(null) */}
                {/*             .map((_, value) => ( */}
                {/*                 <option key={value}>Table no. {value + 1}</option> */}
                {/*             ))} */}
                {/*     </select> */}
                {/* </label> */}

                <button type="submit">Continue</button>
            </form>

            <section
                className="grid gap-2 max-w-screen-lg"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(10px, 100px))' }}
            >
                {Array(TOTAL_TABLES)
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

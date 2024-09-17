import { useEffect, useState } from "react"
import BackgroundGrid from "./components/BackgroundGrid"
import Button from "./components/Button"

const TOTAL_TABLES = 20

const tw = (strings: TemplateStringsArray, ...values: TemplateStringsArray[]) => String.raw({ raw: strings }, ...values)

function App() {
    const [seatDate, setSeatDate] = useState<number[]>([])

    /* Mocking status of an API call */
    const [seatDateFetchStatus, setSeatDateFetchStatus] = useState<"loading" | "success" | "failed" | "uninitiated">(
        "uninitiated"
    )

    /* In a real life scenario this will be an API call to the server */
    useEffect(() => {
        setSeatDateFetchStatus("loading")
        const id = setTimeout(() => setSeatDateFetchStatus("success"), import.meta.env.PROD ? 1000 * 1 : 1)
        return () => {
            clearTimeout(id)
        }
    }, [seatDate])

    const [allotmentConfirmationDialog, setAllotmentConfirmationDialog] = useState(true)

    const [allotmentStatus, setAllotmentStatus] = useState<"loading" | "success" | "failed" | "uninitiated">("success")

    const getSeatDate = () => {
        const len = Math.floor(Math.random() * 10)
        setSeatDate(Array(len).fill(len))
    }

    const reserveSeat = (seatNum: number) => {
        setAllotmentConfirmationDialog(true)
        setAllotmentStatus("loading")
    }

    /* In a real life scenario this will be an API call to the server */
    useEffect(() => {
        let id = undefined
        if (allotmentStatus === "loading") {
            id = setTimeout(
                () => {
                    setAllotmentStatus("success")
                },
                import.meta.env.PROD ? 1000 * 1 : 1
            )
        }
        return () => {
            clearTimeout(id)
        }
    }, [allotmentStatus])

    const labelClassName = "block text-md font-bold text-gray-200"
    const inputClassName =
        "mt-1 w-full rounded-lg border-gray-700 bg-gray-900 px-2 py-3 text-white shadow-sm sm:text-sm outline-primary focus:outline"

    return (
        <main className="relative flex min-h-svh w-full flex-col justify-evenly bg-gray-950 p-2 text-neutral-100 max-lg:items-center lg:flex-row">
            <BackgroundGrid />

            <form
                className="relative grid w-1/3 gap-4 rounded-xl border border-neutral-600 bg-neutral-500/20 p-3 backdrop-blur-sm"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <label className={labelClassName}>
                    Name <input className={inputClassName} type="text" />
                </label>

                <label className={labelClassName}>
                    Phone no. <input className={inputClassName} type="tel" />
                </label>

                <label className={labelClassName}>
                    Email <input className={inputClassName} type="email" />
                </label>

                <label className={labelClassName}>
                    Time
                    <input
                        className={inputClassName}
                        type="time"
                        // min={(() => {
                        //     const time = new Date().toLocaleTimeString("en-ca", { hour12: false })
                        //     return time
                        // })()}
                        // max={(() => {
                        //     const time = new Date(Date.now() + 1000 * 60 * 60 * 2).toLocaleTimeString("en-ca", {
                        //         hour12: false,
                        //     })
                        //     return time
                        // })()}
                    />
                </label>

                <label htmlFor="duration" className={labelClassName}>
                    Duration
                    <select name="duration" className={inputClassName}>
                        <option value="" disabled>
                            Select Duration
                        </option>
                        <option value={15}>{15} min</option>
                        <option value={30}>{30} min</option>
                        <option value={45}>{45} min</option>
                    </select>
                </label>

                <Button
                    type="submit"
                    className="font-bold uppercase"
                    onClick={() => {
                        getSeatDate()
                    }}
                >
                    Continue
                </Button>
            </form>

            {seatDate.length > 0 && (
                <section className="grid place-items-center items-center py-3">
                    {seatDateFetchStatus === "loading" && <div className="text-nowrap">Loading seat status...</div>}
                    {seatDateFetchStatus === "success" && (
                        <>
                            <div
                                className="border-primary/40 grid max-w-screen-md gap-5 rounded-lg border bg-neutral-800/10 p-10 backdrop-blur-sm"
                                style={{
                                    gridTemplateColumns: "repeat(auto-fit, minmax(10px, 100px))",
                                }}
                            >
                                {Array(TOTAL_TABLES)
                                    .fill(" ")
                                    .map((_, tableNum) => {
                                        const seatAvailable = Boolean(Math.floor(Math.random() * 2))
                                        return (
                                            <Button
                                                disabled={!seatAvailable}
                                                key={tableNum}
                                                className={` ${
                                                seatAvailable
                                                        ? "cursor-pointer"
                                                        : "bg-primary/30 cursor-not-allowed border-gray-700/10"
                                                } rounded-md px-5 py-2`}
                                                type="button"
                                                onClick={() => {
                                                    reserveSeat(tableNum)
                                                }}
                                            >
                                                {tableNum + 1}
                                            </Button>
                                        )
                                    })}
                            </div>
                        </>
                    )}
                </section>
            )}

            {allotmentConfirmationDialog && (
                <dialog
                    open={allotmentConfirmationDialog}
                    className="absolute inset-0 grid h-svh w-full place-content-center"
                    style={{
                        backdropFilter: "blur(4px) saturate(80%)",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div className="min-w-1/3 rounded-xl border border-neutral-500 p-3">
                        <Button onClick={() => setAllotmentConfirmationDialog(false)} aria-label="Dismiss dialog">
                            Close X
                        </Button>

                        {allotmentStatus === "loading" && <div className="w-fit bg-white p-4">Loading...</div>}
                        {allotmentStatus === "failed" && (
                            <div className="w-fit bg-white p-4">Sorry try some other table</div>
                        )}
                        {allotmentStatus === "success" && <div className="w-fit bg-white p-4">Successful ✅</div>}
                    </div>
                </dialog>
            )}
        </main>
    )
}

export default App

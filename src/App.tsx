import { useEffect, useLayoutEffect, useState } from "react"
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
    useLayoutEffect(() => {
        setSeatDateFetchStatus("loading")
        const id = setTimeout(() => setSeatDateFetchStatus("success"), import.meta.env.PROD ? 1000 * 1 : 1)
        return () => {
            clearTimeout(id)
        }
    }, [seatDate])

    const [allotmentConfirmationDialog, setAllotmentConfirmationDialog] = useState(false)

    const [allotmentStatus, setAllotmentStatus] = useState<"loading" | "success" | "failed" | "uninitiated">("success")

    const getSeatDate = () => {
        const arr = []
        for (let i = 0; i < TOTAL_TABLES; i++) arr.push(Math.floor(Math.random() * 2))
        setSeatDate(arr)
    }

    const reserveSeat = (seatNum: number) => {
        setAllotmentConfirmationDialog(true)
        setAllotmentStatus("loading")
        setSeatDate((prev) => {
            const newArr = prev.slice()
            newArr.splice(seatNum, 1, 0)
            return newArr
        })
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
        "mt-1 w-full rounded-lg border-gray-700 bg-neutral-900 px-2 py-3 text-white shadow-sm sm:text-sm outline-primary focus:outline"

    return (
        <main className="relative block min-h-svh w-full bg-gray-950 p-2 text-neutral-100 lg:flex">
            <BackgroundGrid />

            <form
                className="relative mx-auto grid min-w-[30%] max-w-lg basis-1/2 gap-4 rounded-xl border border-neutral-600 bg-neutral-500/20 p-3
                    backdrop-blur-sm"
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
                    className="px-4 py-2 font-bold uppercase"
                    onClick={() => {
                        getSeatDate()
                    }}
                >
                    Continue
                </Button>
            </form>

            {seatDate.length > 0 && (
                <section className="grid basis-1/2 place-items-center items-center py-3">
                    {seatDateFetchStatus === "loading" && (
                        <div className="animate-spin text-nowrap">
                            <span className="sr-only">Loading</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </div>
                    )}
                    {seatDateFetchStatus === "success" && (
                        <>
                            <div
                                className="grid max-w-screen-md justify-center gap-5 rounded-lg border border-primary/40 bg-neutral-800/10 px-3 py-10
                                    backdrop-blur-sm md:px-10"
                                style={{
                                    gridTemplateColumns: "repeat(auto-fit, minmax(10px, 100px))",
                                }}
                            >
                                {seatDate.map((seatStatus, tableNum) => {
                                    const seatAvailable = Boolean(seatStatus)
                                    return (
                                        <Button
                                            disabled={!seatAvailable}
                                            key={tableNum}
                                            className={` ${
                                            seatAvailable
                                                    ? "cursor-pointer border-green-300 bg-green-500 active:text-green-500 [&:not(:disabled)]:hover:text-green-500"
                                                    : "cursor-not-allowed"
                                            } rounded-md px-10 py-4`}
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
                    role="alertdialog"
                    open={allotmentConfirmationDialog}
                    className="absolute inset-0 grid size-full place-content-center p-4"
                    style={{
                        backdropFilter: "blur(4px) saturate(80%)",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div className="rounded-xl border border-gray-100 bg-white px-5 py-8">
                        {allotmentStatus === "loading" && (
                            <div className="w-fit animate-spin bg-white p-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                <span className="sr-only">Loading. Please Wait</span>
                            </div>
                        )}
                        {allotmentStatus === "failed" && <div className="w-fit bg-white p-4">Sorry try again</div>}
                        {allotmentStatus === "success" && (
                            <div className="flex items-start gap-5">
                                <div className="flex-1 space-y-3">
                                    <strong className="flex gap-2 font-medium text-gray-900">
                                        Successful
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 text-green-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </strong>

                                    <p className="mt-1 text-sm text-gray-700">
                                        Your seat has been alloted. Allotment no.
                                        {Math.floor(Math.random() * 999)}
                                    </p>
                                </div>

                                <Button
                                    className="border-none bg-transparent px-3 text-gray-500 hover:text-gray-600"
                                    onClick={() => setAllotmentConfirmationDialog(false)}
                                    autoFocus
                                >
                                    <span className="sr-only">close dialog</span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </div>
                        )}
                    </div>
                </dialog>
            )}
        </main>
    )
}

export default App

function App() {
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
                        const seatAvailable = Boolean(Math.floor(Math.random() * 1.3))
                        return (
                            <div key={tableNum} className={[seatAvailable ? 'bg-green-400' : 'bg-red-400'].join(' ')}>
                                {tableNum}
                            </div>
                        )
                    })}
            </section>
        </main>
    )
}

export default App

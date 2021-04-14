import Header from '../components/Header'

const HomePage = () => {
    return (
        <>
            <div className="grid">
                <main className="main">
                    <Header />
                </main>
                <aside className="other-courses">
                    <h3>Other courses</h3>
                </aside>
            </div>
        </>
    )
}

export default HomePage

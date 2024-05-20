export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-bold underline hover:accent-green-700 hover:text-blue-600 text-center">Witamy na stronie głownej projektu</h1>
            <div className="position:absolute grid w-screen h-dvh grid-cols-3 text-center content-center gap-1  items-center justify-center">
                <div>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>a</div>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>b</div>
                </div>
                <div>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>c</div>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>d</div>
                </div>
                <div className={"position: relative"}>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>e</div>
                    <div className={"min-h-32 h-5/6 hover:border-2 hover:border-dashed border-blue-400"}>
                        <a
                            href={"https://github.com/Dawido69929/project20502"}><p>Link do githuba projektu</p><i className="ri-github-fill text-white text-"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}
// wait for an element with the given CSS selector to appear:
// await asyncWaitFor('.thing')
// doSomethingWith('.thing')
export default item => {
    return new Promise(res => {
        let present = false

        // set up loop
        const check = () => {
            present = document.querySelector(item)

            if (!present) {
                requestAnimationFrame(check)
            } else {
                requestAnimationFrame(res)
            }
        }

        // kick off loop
        check()
    })
}

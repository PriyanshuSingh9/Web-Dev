interface ApiPromise<T> {
    res: number,
    data: T
}

const responses: ApiPromise<string> = {
    res: 200,
    data: "Hello dost"
}

const rootUrl =
    process.env.NODE_ENV === 'production'
        ? `${process.env.PUBLIC_URL}/api`
        : 'http://localhost:4000';

export const getLabels = async () => {
    console.log("heloooooo")
    const res = await fetch(`${rootUrl}/features/`);
    console.log(res)
    return res.json();
}

export const getTrend = async (id: string, start: string, end: string) => {

    const res = await fetch(`${rootUrl}/query/${id}/${start}/${end}`);
    return res.json();
}
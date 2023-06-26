export function load({ params}) {
    console.log(params);

    return {
        filter: params.country
    }
}
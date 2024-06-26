const getUserInfo = async () => {
    const username = document.getElementById("usernameInput").value.trim();
    if(username === ''){
        alert("Please enter a valid name.");
    } else {
        try{
            const agifyResponse = await fetch(`https://api.agify.io?name=${username}`);
            const agifyData = await agifyResponse.json();
            console.log(agifyData);

            const genderizeResponse = await fetch(`https://api.genderize.io?name=${username}`);
            const genderizeData = await genderizeResponse.json();
            console.log(genderizeData);

            const nationalizeResponse = await fetch(`https://api.nationalize.io/?name=${username}`);
            const nationalizeData = await nationalizeResponse.json();
            console.log(nationalizeData);

            const boredResponse = await fetch(`http://www.boredapi.com/api/activity/`)
            const boredData = await boredResponse.json();

            const userInfo = document.getElementById("userInfo");
            userInfo.innerHTML = `
                <p>Predicted age for ${username}: ${agifyData.age}</p>
                <p>Gender prediction for ${username}: ${genderizeData.gender}</p>
                <p>Nationality predictions for ${username}:
                <ul>
                ${nationalizeData.country.map(item => `<li>${item.country_id}: ${item.probability.toFixed(2)}</li>`).join('')}
                </ul>
                <h2>Something to do when you are bored: </h2>
                <h3>${boredData.activity}</h3>
            `
        } catch (error){
            console.log("Error fetching data:", error);
            document.getElementById("userInfo").textContent = "Error fetching user information.";
        }
    } 
}
import { Text, ActivityIndicator } from "react-native";
import { useTodayChallenge } from "../../hooks/useTodayChallenge";

const TodayChallenge = () => {

    const { loading, challenge } = useTodayChallenge();
    
    return(
        <>
            {loading && <ActivityIndicator />}

            {!loading && !challenge && (
                <Text>No encontrado</Text>
            )}


            <Text>Reto de hoy : {challenge?.title}</Text>
        </>
    )
}

export default TodayChallenge;

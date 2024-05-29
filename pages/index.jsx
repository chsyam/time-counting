import { useEffect, useRef, useState } from "react";
import styles from "./../styles/index.module.css"

export default function Home({presentTime}) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(presentTime);

    const labels = ["Days","Hours", "Minutes","Seconds"];

    useEffect(() => {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 1000);
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, []);

    function formatTime() {
        let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        days = String(days).padStart(2, "0");
        hours = String(hours%24).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${days}:${hours}:${minutes}:${seconds}`;
    }

    return(
        <div className={styles.stopwatch}>
            <div className={styles.display}>
                {
                    formatTime().split(":").map((item,index) => {
                        return <div className={styles.items} key={index}>
                            {item.trim()}<span className={styles.labels}> {labels[index]}</span>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export async function getStaticProps() {
    var presentTime = new Date('2024-05-27T22:00:00').getTime()
    
    return {
        props: {
            presentTime,
        }
    }
}
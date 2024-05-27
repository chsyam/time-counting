import { useEffect, useRef, useState } from "react";
import styles from "./../styles/index.module.css"

export default function Home({presentTime}) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(presentTime);

    const labels = ["Hours", "Minutes","Seconds"];

    useEffect(() => {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime((Date.now()+5.5 * 60 * 60 * 1000) - startTimeRef.current);
            }, 1000);
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, []);

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
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
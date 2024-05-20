import React from "react";
import styles from "../styles/CityCard.module.scss"; // Import custom styles
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CityProps {
  data: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
  };
}

const CityCard: React.FC<CityProps> = ({ data }) => {
  const {
    name,
    latitude,
    longitude,
    elevation,
    timezone,
    population,
    country,
    admin1,
    admin2,
  } = data;
  const router = useRouter();
  return (
    <Link
      href={{
        pathname: `/whether/${name}`,
        query: { latitude, longitude },
      }}
      className={styles.card}>
      <h2>{name}</h2>
      <p>
        <strong>Country:</strong> {country}
      </p>
      <p>
        <strong>State:</strong> {admin1}
      </p>
      <p>
        <strong>District:</strong> {admin2}
      </p>

      <p>
        <strong>Elevation:</strong> {elevation} m
      </p>
      <p>
        <strong>Timezone:</strong> {timezone}
      </p>
    </Link>
  );
};

export default CityCard;

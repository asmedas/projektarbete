import DataTable from '../tables/DataTable';

export default function ViewCars() {
  const cars = [
    { brand: "BMW", type: "combi", year: 2018 },
    { brand: "BMW", type: "sedan", year: 2020 },
    { brand: "Audi", type: "combi", year: 2019 },
    { brand: "Volvo", type: "combi", year: 2017 },
  ];

  return <DataTable data={cars} />;
}

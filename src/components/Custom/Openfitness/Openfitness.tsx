import { Button, Grid2 as Grid } from '@mui/material';
import ChartsContainer from '@custom/charts/ChartsContainer';
import QueryWrapper from '@custom/wrappers/QueryWrapper/QueryWrapper';

const defaultCharts = {
    weight: "line",
    food: "bar",
    exercise: "bar",
    steps: "line",
    sleep: "bar",
};

interface OpenfitnessPropsType {
    goBack?: () => void
    [key: string]: any // allow loose props for now
};

const Openfitness = (props: OpenfitnessPropsType) => (
    <Grid container mt={10}>
        {/* {console.log("App.props: ", utilityStore) as any} */}
        <Grid>
            Openfitness2.1.mfe
            {console.log("App.props: ", props) as any}
            <Button variant="outlined" color="inherit" onClick={() => {}}>
                Go to WellnessPlannerUI
            </Button>
            <Button variant="outlined" color="inherit" onClick={props.goBack}>
                Back to home
            </Button>
        </Grid>
        {/* <QueryWrapper path={({ openfitnessTables }: { openfitnessTables: string }) => openfitnessTables}>
            {({ data }: { data: any }) => data && <>Helo</> || Object
                .keys(data.charts)
                .map((chart, index) => (
                    <Grid key={chart} size={{ xs: 12, sm: 12, md: !index ? 12 : 6 }}>
                        <ChartsContainer
                            label={`Fitness Tables ${chart}`}
                            charts={data.charts[chart]}
                            defaultChart={defaultCharts[chart as keyof typeof defaultCharts]}
                            // onChartData={(data: any) => console.log("Data getting passed into the chart: ", data)}
                        />
                    </Grid>
            ))}
        </QueryWrapper> */}
    </Grid>
);

export default Openfitness;

import '../App.css'
import LanguageStat from "./LanguageStat";
import LabelStackBar from "./LabelStackBar";
import LanguageColorData from '../constants/LanguageColors.json'
import { Grid } from '@material-ui/core';

function Repo(props) {
    const {url, name, description, stats} = props.repo

    let totals = 0;

    stats.forEach(function(item){
        totals+= item.usage;
    });

    stats.forEach(function(item){
        let percent = (100 * item.usage) / totals;
        item.percent = percent.toFixed(2) + "%";
        item.color = LanguageColorData[item.name];
        item.url = url;
        
        if (item.color === undefined) {
            item.color = "#ccc"
        }
    });

    return (
        <Grid item xs={12} md={4} lg={3}>
            <div className="box">
                <div className="repo-container">
                    <Grid>
                        <a href={url} target="blank"><span>{name}</span></a>
                    </Grid>
                    <Grid>
                        <p className="text-small line-clamp">{description}</p>
                    </Grid>
                    {
                        stats.length > 0 &&

                        <Grid>
                            <div className="mb-2">
                                <span className="text-small" style={{color: 'white', fontWeight: 600}}>Languages</span>
                            </div>
                            <div className="mb-2">
                                <span className="progress">
                                    {stats.map(stat => {
                                        return <LabelStackBar key={stat.name} stat={stat}/>
                                    })}
                                </span>
                            </div>
                            <div className="mb-2">
                                <ol>
                                    {stats.map(stat => {
                                        return <LanguageStat key={stat.name} stat={stat}/>
                                    })}
                                </ol>
                            </div>
                        </Grid>
                    }
                </div>
            </div>
        </Grid>
    );
}

export default Repo;
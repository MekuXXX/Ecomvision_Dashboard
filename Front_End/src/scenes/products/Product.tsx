import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
} from "@mui/material";
import Header from "../../components/Header/Header";
import FetchLate from "../../components/fetchLate/FetchLate";
import { useDispatch } from "react-redux";
import { setUserProducts } from "../../features/data/dataSlice";
import { useFetch } from "../../hooks/useFetch.tsx";
const Product = ({
    _id,
    name,
    rating,
    price,
    description,
    category,
    stat,
}: userProducts) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant="h5" component={"div"}>
                    {name}
                </Typography>
                <Typography
                    sx={{ mb: "1.5rem" }}
                    color={theme.palette.secondary[400]}
                >
                    ${Number(price).toFixed()}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">{description}</Typography>
                <CardActions>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => setIsExpanded((prev) => !prev)}
                    >
                        See more
                    </Button>
                    <Collapse
                        in={isExpanded}
                        timeout={"auto"}
                        unmountOnExit
                        sx={{ color: theme.palette.neutral[300] }}
                    >
                        <CardContent>
                            <Typography>id: {_id}</Typography>

                            <Typography>
                                Created at: {stat[0].createdAt}
                            </Typography>
                            <Typography>
                                Updated at: {stat[0].updatedAt}
                            </Typography>
                            <Typography>id: {_id}</Typography>
                        </CardContent>
                    </Collapse>
                </CardActions>
            </CardContent>
        </Card>
    );
};
const Products = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useFetch(
        "Products",
        "client/products"
    );

    useEffect(() => {
        dispatch(setUserProducts(data?.data));
    }, [data, dispatch]);
    if (isLoading || isError)
        return (
            <FetchLate
                isLoading={isLoading}
                isError={isError}
                text="products"
            />
        );
    return (
        <Box p={"2rem"}>
            <Header title="PRODUCTS" subtitle="See your list of products" />
            <Box
                display={"grid"}
                gridTemplateColumns={"repeat(auto-fill, minmax(20rem , 1fr))"}
                justifyContent={"space-between"}
                rowGap={"1.25rem"}
                columnGap={"1.33%"}
            >
                {data?.data?.map(
                    ({
                        _id,
                        name,
                        rating,
                        price,
                        description,
                        category,
                        stat,
                    }: userProducts) => (
                        <Product
                            key={_id}
                            _id={_id}
                            name={name}
                            rating={rating}
                            price={price}
                            description={description}
                            category={category}
                            stat={stat}
                        />
                    )
                )}
            </Box>
        </Box>
    );
};

export default Products;

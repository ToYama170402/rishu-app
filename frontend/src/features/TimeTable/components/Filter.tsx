"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Groups2Icon from "@mui/icons-material/Groups2";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import React from "react";
import { lectureArray2Filter } from "../util/lectureArray2Filter";
import { lectureWithApplicantsAmount } from "@/types/lecture";

export default function DrawerContent({
  lectures,
  applyFilter,
}: {
  lectures: lectureWithApplicantsAmount[];
  applyFilter: React.Dispatch<
    React.SetStateAction<lectureWithApplicantsAmount[]>
  >;
}): React.ReactNode {
  type isFilterOpen = {
    filter: boolean;
    category: boolean;
    teacher: boolean;
    targetStudent: boolean;
  };

  const [isFilterOpen, setIsFilterOpen] = React.useState<isFilterOpen>({
    filter: false,
    category: false,
    teacher: false,
    targetStudent: false,
  });

  const handleFilerOpen = (key: keyof isFilterOpen) => {
    setIsFilterOpen({ ...isFilterOpen, [key]: !isFilterOpen[key] });
  };
  const filterTarget = lectureArray2Filter(lectures);
  const [filter, setFilters] = React.useState(filterTarget);

  React.useEffect(() => {
    applyFilter(
      lectures.filter((lec) => {
        if (filter.category[lec.category] === false) return false;
        if (filter.teacher[lec.teacher] === false) return false;
        if (filter.targetStudent[lec.target] === false) return false;
        return true;
      })
    );
  }, [filter, lectures, applyFilter]);

  return (
    <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <List dense>
        <ListItemButton onClick={() => handleFilerOpen("filter")}>
          <FilterAltIcon />
          <ListItemText primary="フィルター" sx={{ marginLeft: "16px" }} />
          {isFilterOpen.filter ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isFilterOpen.filter} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            <ListItem sx={{ display: "block", paddingLeft: "40px" }}>
              <ListItemButton onClick={() => handleFilerOpen("category")}>
                <CategoryIcon />
                <ListItemText primary="科目区分" />
                {isFilterOpen.category ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isFilterOpen.category} timeout="auto" unmountOnExit>
                <List disablePadding dense>
                  {Object.keys(filter.category)
                    .sort()
                    .map((category) => (
                      <ListItem sx={{ display: "block" }} key={category}>
                        <ListItemButton
                          onClick={() => {
                            filter.category[category] =
                              !filter.category[category];
                            setFilters({ ...filter });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filter.category[category]}
                            disableRipple
                            size="small"
                          />
                          <ListItemText primary={category} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </ListItem>
            <ListItem sx={{ display: "block", paddingLeft: "40px" }}>
              <ListItemButton onClick={() => handleFilerOpen("teacher")}>
                <AccountCircleIcon />
                <ListItemText primary="先生" />
                {isFilterOpen.teacher ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isFilterOpen.teacher} timeout="auto" unmountOnExit>
                <List disablePadding dense>
                  {Object.keys(filter.teacher)
                    .sort()
                    .map((teacher) => (
                      <ListItem sx={{ display: "block" }} key={teacher}>
                        <ListItemButton
                          onClick={() => {
                            filter.teacher[teacher] = !filter.teacher[teacher];
                            setFilters({ ...filter });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filter.teacher[teacher]}
                            disableRipple
                            size="small"
                          />
                          <ListItemText primary={teacher} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </ListItem>
            <ListItem sx={{ display: "block", paddingLeft: "40px" }}>
              <ListItemButton onClick={() => handleFilerOpen("targetStudent")}>
                <Groups2Icon />
                <ListItemText primary="対象学生" />
                {isFilterOpen.targetStudent ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={isFilterOpen.targetStudent}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding dense>
                  {Object.keys(filter.targetStudent)
                    .sort()
                    .map((targetStudent) => (
                      <ListItem sx={{ display: "block" }} key={targetStudent}>
                        <ListItemButton
                          onClick={() => {
                            filter.targetStudent[targetStudent] =
                              !filter.targetStudent[targetStudent];
                            setFilters({ ...filter });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filter.targetStudent[targetStudent]}
                            disableRipple
                            size="small"
                          />
                          <ListItemText primary={targetStudent} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

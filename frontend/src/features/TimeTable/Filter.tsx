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
import { filters } from "../util/timeTable";

export default function DrawerContent({
  filters,
  setFilters,
  isFilterOpen,
  setFiltersOpen,
}: {
  filters: filters;
  setFilters: Function;
  isFilterOpen: {
    filter: boolean;
    category: boolean;
    teacher: boolean;
    targetStudent: boolean;
  };
  setFiltersOpen: Function;
}): React.ReactNode {
  function handleFilerOpen(
    category: "filter" | "category" | "teacher" | "targetStudent"
  ) {
    switch (category) {
      case "filter":
        isFilterOpen.filter = !isFilterOpen.filter;
        setFiltersOpen({ ...isFilterOpen });
        break;
      case "category":
        isFilterOpen.category = !isFilterOpen.category;
        setFiltersOpen({ ...isFilterOpen });
        break;
      case "teacher":
        isFilterOpen.teacher = !isFilterOpen.teacher;
        setFiltersOpen({ ...isFilterOpen });
        break;
      case "targetStudent":
        isFilterOpen.targetStudent = !isFilterOpen.targetStudent;
        setFiltersOpen({ ...isFilterOpen });
        break;
    }
  }
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
                  {Object.keys(filters.category)
                    .sort()
                    .map((category) => (
                      <ListItem sx={{ display: "block" }} key={category}>
                        <ListItemButton
                          onClick={() => {
                            filters.category[category] =
                              !filters.category[category];
                            setFilters({ ...filters });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filters.category[category]}
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
                  {Object.keys(filters.teacher)
                    .sort()
                    .map((teacher) => (
                      <ListItem sx={{ display: "block" }} key={teacher}>
                        <ListItemButton
                          onClick={() => {
                            filters.teacher[teacher] =
                              !filters.teacher[teacher];
                            setFilters({ ...filters });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filters.teacher[teacher]}
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
                  {Object.keys(filters.targetStudent)
                    .sort()
                    .map((targetStudent) => (
                      <ListItem sx={{ display: "block" }} key={targetStudent}>
                        <ListItemButton
                          onClick={() => {
                            filters.targetStudent[targetStudent] =
                              !filters.targetStudent[targetStudent];
                            setFilters({ ...filters });
                          }}
                          dense
                        >
                          <Checkbox
                            edge="start"
                            checked={filters.targetStudent[targetStudent]}
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

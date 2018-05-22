<template>
    <div class="">
		<el-row >
			<el-col :span="18">
				<span class="grid-content">查　询 : </span>
				<span class="grid-condition">
                    <el-input size="small" placeholder="输入菜品名称"></el-input>
                </span>
			</el-col>
			<el-col :span="6">
				<span class="grid-content align-right">
                    <el-button  type="primary" size="small">
                        <i class="icon iconfont icon-roulei"></i>发布派送
                    </el-button>
                </span>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>
